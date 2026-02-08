import menuData from "../data/menu.json";

export const useMenu = () =>{
    const items = menuData? menuData.filter((item) => item.available): [];
    return {items}
}


export const useMenuById=(id)=> {
    const item = menuData.find(item=> item.id === id)
    return {item}
}