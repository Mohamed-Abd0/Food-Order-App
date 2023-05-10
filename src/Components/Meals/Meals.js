import { Fragment } from 'react';

import Summary from './Summary';
import AvailableMeals from './AvailableMeals';
import react from 'react';

const Meals = () => {
  // console.log('meals is running')
  return (
    <Fragment>
      <Summary />
      <AvailableMeals />
    </Fragment>
  );
};

// meals will excuted in the first time app excuted only 
export default react.memo( Meals );
