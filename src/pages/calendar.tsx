import { useState } from 'react';
import { Badge, Calendar as CalendarAnt, Modal, Input } from 'antd';
import dayjs from 'dayjs';
import styles from '../styles/pages/Calendar.module.css';


const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
        {
          type: 'error',
          content: 'This is error event.',
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event',
        },
        {
          type: 'success',
          content: 'This is very long usual event......',
        },
        {
          type: 'error',
          content: 'This is error event 1.',
        },
        {
          type: 'error',
          content: 'This is error event 2.',
        },
        {
          type: 'error',
          content: 'This is error event 3.',
        },
        {
          type: 'error',
          content: 'This is error event 4.',
        },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};
export default function Calendar() {

  const [value, setValue] = useState(null);
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const formattedValue = {
      content: value,
      type: 'success',
    }

    dateCellRender({ value: selectedValue, selectedValue: formattedValue });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSelect = (newValue) => {
    // setValue(newValue);
    setSelectedValue(newValue);
    showModal();
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = ({value, selectedValue}) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div className={styles.container}>
      <div className={styles.calendarContainer}>
        <CalendarAnt className={styles.calendar} cellRender={cellRender} onSelect={onSelect} /> 
      </div>
      <Modal title="Marque um compromisso em sua agenda" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="Basic usage" onChange={setValue} />
      </Modal>
    </div>
  );
};