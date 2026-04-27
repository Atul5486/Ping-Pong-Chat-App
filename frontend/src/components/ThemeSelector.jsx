import { PaletteIcon } from 'lucide-react'
import {THEMES} from '../constant/index.js'
import { useThemeStore } from '../store/useThemeStore.js'

const ThemeSelector = () => {

  const {setTheme}=useThemeStore();
  return (
    <div className='dropdown dropdown-bottom dropdown-end'>
      <div tabIndex={0} role='button' className='btn btn-circle m-1'>
        <PaletteIcon size={19}/>
      </div>
      <div className='  dropdown-content menu p-2 shadow-sm bg-base-100 rounded-box w-54 max-h-80 overflow-y-auto'>
          <ul tabIndex={1}>
            {
              THEMES.map((theme)=>(
                <li key={theme.name}>
                  <a onClick={()=>setTheme(theme.name)}
                  className={`w-full flex items-center gap-3 transition ${theme===theme.name ? "bg-base-300":"hover:bg-base-200"}`}
                  >
                  <PaletteIcon className='size-4'/>
                  <span className='font-medium'>{theme.label}</span>

                  <div className='ml-auto flex gap-1'>
                    {theme.colors.map((color,i)=>(
                      <span key={i} className='h-2 w-2 rounded-full' style={{backgroundColor:color}}></span>
              ))}
                  </div>
                  </a>
                </li>
              ))  
            }
          </ul>
      </div>
    </div>
  )
}

export default ThemeSelector
