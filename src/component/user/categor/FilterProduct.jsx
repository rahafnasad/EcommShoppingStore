import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ReactSlider from 'react-slider';
import Slider from 'react-slider';
export default function FilterProduct() {
let [min,setMin]=useState(0);
let [max,setMax]=useState(100);

  return (

    <aside className='Profile'>
        <div className="profileLink">
            <nav>
                <Link to="" className='mt-5'> <ReactSlider
    className="horizontal-slider"
    thumbClassName="example-thumb"
    trackClassName="example-track"
    defaultValue={[0, 100]}
    ariaLabel={['Lower thumb', 'Upper thumb']}
    ariaValuetext={state => `Thumb value ${state.valueNow}`}
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    pearling
    onChange={([min,max])=>{
      setMin(min)
      setMax(max)

    }}
/></Link>
             


            </nav>
        </div>
        <div className="UserData mt-5">
        <Outlet/>
        </div>

    </aside>



  );
}
