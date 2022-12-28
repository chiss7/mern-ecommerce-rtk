const CheckoutSteps = (props) => {
  return (
    <div className="flex my-8 justify-evenly w-4/5 sm:w-2/3 md:w-1/2">
      <div className={props.step1 ? 'active' : 'inactive'}>Login</div>
      <div className={props.step2 ? 'active' : 'inactive'}>Shipping</div>
      <div className={props.step3 ? 'active' : 'inactive'}>Place Order</div>
    </div>
  )
}

export default CheckoutSteps
