export default function isSubscribed ({ next, store }){
    if(!store.getters["user/isSubscribed"]){
        return next({
           name: 'dashboard'
        })
    }
   
    return next()
   }