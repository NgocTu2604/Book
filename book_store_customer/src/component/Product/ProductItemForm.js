import React, { useRef } from "react";
import { Button } from "react-bootstrap";


function ProductItemForm(props) {

    
    const amountInputRef = useRef();
    const submitHandler = (e) =>{
        e.preventDefault();
        const enterAmount = amountInputRef.current.value;
        const enterAmountNumber = +enterAmount; //convert
        if (
            enterAmount.trim().length === 0 ||
            enterAmountNumber < 0 ||
            enterAmountNumber > 5
        )
            return;
        
        props.onAddToCart(enterAmountNumber);
    }

    const ViewButton = () =>{
        if(props.amount===0)
        {
            return <Button variant="disable" type="submit">Add to cart</Button>
        }
        else if(props.amount> 0){
            return <Button type="submit">Add to cart</Button>
        }
    } 

    return (
        
                <form action="" onSubmit={submitHandler}>
                   <ViewButton/>
                    <input
                        ref={amountInputRef}
                        label="Amount"
                        id="amount"
                        type="number"
                        min="1"
                        max="5"
                        step="1"
                        defaultValue="1"
                    />
                </form>
        
    );
}

export default ProductItemForm;
