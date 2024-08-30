import { FC } from 'react';
import styles from './GridPattern.module.css';
import classNames from 'classnames';

const GridPattern: FC = () => {
  const gridSize = 15;

  const getRandomOpacity = (): number => {
    return Math.random();
  };

  const squares = Array.from({ length: gridSize * gridSize }).map(
    (_, index) => {
      const opacity = getRandomOpacity();
      if (opacity > 0) {
        return (
          <div
            className={classNames(styles['grid-item'])}
            key={index}
            style={{ backgroundColor: `rgba(8, 8, 8, ${opacity})` }}
          ></div>
        );
      }
    }
  );

  return <div className={styles['grid-container']}>{squares}</div>;
};

export default GridPattern;
