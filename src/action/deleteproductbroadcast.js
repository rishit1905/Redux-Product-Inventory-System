const deleteProductBroadcast=function(product){
    console.log(product);
    console.log("Reducer will capture the event and payload..")
    return({
        type:"DELETE_PRODUCT",
        payload:product
    })
}

export default deleteProductBroadcast