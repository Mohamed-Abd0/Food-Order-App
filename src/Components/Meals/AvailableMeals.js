
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';
import useRequest from '../Hooks/useRequest';



const AvailableMeals = () => {
  // console.log('AvailableMeals is running')
  const [meals , setMeals] = useState([]);



  // handling the data recieved from the server
  const responseHndler = (response)=>{
    const loadedMeals = []
    for(let key in response){
      loadedMeals.push({
        id: key,
        name: response[key].name,
        description: response[key].description,
        price: response[key].price,
      })
    }

    setMeals(loadedMeals);
  }

  // use custom hook to send request 
  const {sendRequest: fetchMeals , isLoading , error} = useRequest()
  
  
  
  useEffect(()=>{
    
    // send request , handle the response and set loading & error states
    fetchMeals({url: 'https://food-app-8704a-default-rtdb.firebaseio.com/meals.json'} , responseHndler)

  },[])


  const renderdMeals = meals.map(meal => 
  <MealItem
  key = {meal.id}
  id = {meal.id}
  name= {meal.name}
  description= {meal.description}
  price = {meal.price}
  />
  );


  // what will render on the screen
  if(isLoading){
      return(
        <section className={classes.loading}>
          <p>loading...</p>
        </section>
      )
  }if (error) {
    return(
      <section className={classes.error}>
        <p>{error}</p>
      </section>
    )
  } else {
    return (
      <section className={classes.meals}>
        <Card>
          <ul>{renderdMeals}</ul>
        </Card>
      </section>
    );
  }

};

export default AvailableMeals;
