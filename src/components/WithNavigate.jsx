import { createContext } from "react";
import { useNavigate } from "react-router-dom"

const NavigateContext = createContext();

const NavigationProvider = ({children}) =>{
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handelGoForward = () => {
    navigate(1);
  };

  return(
    <NavigateContext.Provider 
      value={ {navigate, handleGoBack, handelGoForward} }
    >
      {children}
      </NavigateContext.Provider>
  )
}

export { NavigateContext, NavigationProvider }