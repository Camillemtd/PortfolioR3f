import React, {useState} from 'react';

const SoundCheck = ({setSound}) => {
	const [checkSound, setCheckSound] = useState(true)
	return (
		<div className={`h-screen w-screen bg-black absolute z-50 text-white flex justify-center items-center  flex-col gap-5 ${checkSound ? 'visible' : 'invisible'}`}>
			<button className='slide-in-top border p-5 rounded-lg text-4xl cursor' onClick={() => {setCheckSound(false), setSound(true)}}>Enter with sound</button>
			<span className='slide-in-top'>or</span>
			<button className='slide-in-top border p-5 rounded-lg opacity-80 cursor' onClick={() => {setCheckSound(false), setSound(false)}}>Enter without sound</button>
		</div>
	);
};

export default SoundCheck;