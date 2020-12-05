import React from 'react' 
import StaffStore from './StaffStore';
import ProductStore from './ProductStore';

const isServer = typeof window === 'undefined';
// useStaticRendering(isServer);

let store;

export  function getStores(initialData = { productStore: {}, categoryStore: {}, staffStore: {} }) {

    if(isServer) {
        return {
						// authStore: new Auth(),
						staffStore: new StaffStore(initialData.staffStore),
            productStore: new ProductStore(initialData.ProductStore),
            // stockStore: new StockStore(initialData.StockStore),
            // categoryStore: new CategoryStore(initialData.categoryStore),
            // chatStore: new ChatStore(initialData.chatStore),
            // locationStore: new LocationStore(initialData.locationStore),
            // orderStore: new OrderStore(initialData.orderStore),
            // userStore: new UserStore(initialData.userStore),
            // dashboardStore: new DashboardStore(initialData.dashboardStore)
        };
    }
    if(!store) {
        store = {
            // authStore: new Auth(),
            productStore: new ProductStore(initialData.ProductStore),
            staffStore: new StaffStore(initialData.staffStore),
            // categoryStore: new CategoryStore(initialData.categoryStore),
            // chatStore: new ChatStore(initialData.chatStore),
            // locationStore: new LocationStore(initialData.locationStore),
            // orderStore: new OrderStore(initialData.orderStore),
            // userStore: new UserStore(initialData.userStore),
            // dashboardStore: new DashboardStore(initialData.dashboardStore)
        };
    }
    return store;
}

const StoreContext = React.createContext();

export function StoreProvider(props) {
    return <StoreContext.Provider value={props.value}>
        {props.children}
    </StoreContext.Provider>
}


 

export function useMobxStores() {
    return React.useContext(StoreContext);
}
