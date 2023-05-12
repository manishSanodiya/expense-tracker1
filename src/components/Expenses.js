import React,{useRef,useState} from 'react'
import classes from './expenses.module.css';
import FormItem from './FormItem';

const Expenses = () => {
    const moneySpentRef = useRef('')
    const discriptionRef = useRef('')
    const categoryRef = useRef('')
    const [listData,setListData] = useState([]);
    const submitHandler=(e)=>{
        e.preventDefault();
        const moneySpent = moneySpentRef.current.value;
        const discription = discriptionRef.current.value;
        const category = categoryRef.current.value;
        let lt = {
            moneySp:moneySpent,
            desc:discription,
            cat:category
        }
        setListData([...listData,lt]);
        console.log(listData);

    }


  return (
  <div>  <form className={classes.form} onSubmit={submitHandler}>
  <div className={classes.control}>
    <label htmlFor="new-password">Money Spent</label>
    <input
      type="number"
      id="spent-money"
  
      ref={moneySpentRef}
    />
  </div>
 
  <div className={classes.control}>
    <label htmlFor="new-password">Discription</label>
    <input
      type="text"
      id="discription"
  
      ref={discriptionRef}
    />
  </div>
  <div className={classes.control}>
    <label htmlFor="new-password">Category</label>
    <select ref={categoryRef}>
    <option >Food</option>
          <option>OTT</option>
          <option>Games</option>
          <option>Movies</option>
          <option>Groceries</option>
    </select>
  </div>
  <div className={classes.action}>
    <button>Add Expenses</button>
  </div>
</form>
<ul>
    {listData!==[] && listData.map((data,index)=>{return(
      <p key={index}>
       <FormItem money={data.moneySp} discription={data.desc} category={data.cat}/>
    
      </p>
    )
  
    })}
    </ul>
</div>
  )
}

export default Expenses
