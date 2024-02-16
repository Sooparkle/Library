import { createContext } from "react";
import { useNavigate } from "react-router-dom"

const NavigateContext = createContext();

const NavigationProvider = ({children}) =>{
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoForward = () => {
    navigate(1);
  };

  return(
    <NavigateContext.Provider  value={ {navigate, handleGoBack, handleGoForward} } >
      {children}
    </NavigateContext.Provider>
  )
}

export { NavigateContext, NavigationProvider }


