import axios from 'axios';
import { useEffect, useState } from 'react';

const Card = () => {
	let [values, setvalu] = useState('');
	let [doms, setdom] = useState([]);
	const [county, setCounty] = useState('');
	const [array, setarray] = useState([]);
	const [weather, setweather] = useState(
		JSON.parse(window.localStorage.getItem('key')) || [],
	);

	window.localStorage.setItem('key', JSON.stringify(weather));

	function waet(evt) {
		let saves = array.filter((e) => e.text === evt);
		console.log(weather);
		return setweather([...weather, ...saves]);
	}

	useEffect(() => {
		axios
			.get(
				county !== ''
					? `https://api.openweathermap.org/data/2.5/weather?q=${county}&appid=81f613d0008bc9e466dac77341bea97d&units=metric`
					: ' ',
			)
			.then(function (response) {
				setdom(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, [county]);

	return (
		<div>
			<form
				onSubmit={(evt) => {
					evt.preventDefault();
					array.length === 5
						? array.splice(0, 1)
						: setarray([
								...array,
								{
									id: array.length + 1,
									text: values,
								},
						  ]);
				}}>
				<input onChange={(evt) => setvalu(evt.target.value)} type='text' />
				<button type='submit'>submit</button>
			</form>

			<div className='box'>
				{array.length &&
					array?.map((e) => (
						<div className='boxs' key={e.id}>
							<p> {e.text}</p>
							<button onClick={(evt) => waet(evt.target.id)} id={e.text}>
								save
							</button>
						</div>
					))}
			</div>
			<div className='save'>
				{doms.length !== 644 && (
					<>
						<div className='div'>
							<h2 className='tittle'>{doms?.name}</h2>
							<p className='id'>{doms?.country}</p>
							<p> time-zone: {doms?.timezone}</p>
							{doms.weather?.map((element) => {
								return (
									<div key={element.icon}>
										<img
											src={`http://openweathermap.org/img/wn/${element.icon}@2x.png`}
											width='50'
											height={50}
											alt=''
										/>
										<p> description: {element.description} </p>
										<p>main: {element.main} </p>
									</div>
								);
							})}
							<div className='boxs-rigt'>
								<p className='temp-min'>temp-min:{doms.main?.temp_min}</p>
								<p className='temp-max'>temp-max:{doms.main?.temp_max} </p>
								<p className='wind'>wind:{doms.wind?.speed} speed</p>
							</div>
						</div>
					</>
				)}

				<ul className='list'>
					{weather?.map((e) => (
						<li key={e.id}>
							<p>{e.text}</p>
							<button onClick={(evt) => setCounty(evt.target.id)} id={e.text}>
								{' '}
								weather{' '}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Card;
