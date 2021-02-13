import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CityInfo from '../../components/CityInfo/CityInfo';
import StatusBar from './../../components/StatusBar/StatusBar';
import WeeklyForecast from '../../components/forecast/WeeklyForecast';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import hr from '../../images/hr.jpg';
import c from '../../images/c.jpg';
import hc from '../../images/hc.jpg';
import s from '../../images/s.jpg';
import lc from '../../images/lc.jpg';
import sn from '../../images/sn.jpg';
import h from '../../images/h.jpg';
import t from '../../images/t.jpg';
import sl from '../../images/sl.jpg';
import lr from '../../images/lr.jpg';

export default function WeatherData() {
	const [currentWeth, setcurrentWeth] = useState();
	const [forcasttWeth, setForcasttWeth] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const location = useRef();
	const [woeid, setWoeid] = useState(1979455);

	useEffect(() => {
		function requestData() {
			try {
				axios
					.get(
						`https://tranquil-cove-12072.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
					)
					.then((wethData) => {
						setcurrentWeth(wethData.data);
						setForcasttWeth(wethData.data);
						setLoading(false);
					});
			} catch (err) {
				setError(err);
			}
		}
		requestData();
	}, [woeid]);

	const getLocation = (e) => {
		e.preventDefault();
		try {
			axios
				.get(
					`https://tranquil-cove-12072.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${location.current.value}`
				)

				.then((location) => {
					if (location.data[0] !== undefined) {
						setWoeid(location.data[0].woeid);
					} else {
						alert('please type correct location!');
					}
				});
		} catch (err) {
			setError(err);
		}
	};

	if (loading) {
		return (
			<div>
				{error ? error : <Spinner animation="border" variant="primary" />}
			</div>
		);
	}
	const forecastData = forcasttWeth.consolidated_weather.map((weather, i) => (
		// 	<tbody key={i}>
		// 	<tr>
		// 		<td>
		// 			<object
		// 				width="30"
		// 				height="30"
		// 				data={
		// 					'https://www.metaweather.com/static/img/weather/' +
		// 					weather.weather_state_abbr +
		// 					'.svg'
		// 				}
		// 				type="image/svg+xml"
		// 			>
		// 				somthing
		// 			</object>
		// 		</td>
		// 		<td>{weather.applicable_date}</td>
		// 		<td>{parseInt(weather.min_temp)}°C</td>
		// 		<td>{parseInt(weather.max_temp)}°C</td>
		// 		<td>{parseInt(weather.wind_speed)}kph</td>
		// 	</tr>
		// </tbody>
		<Container className="mt-5" key={i}>
			<Row>
				<Col>
					{' '}
					<object
						width="65"
						height="65"
						data={
							'https://www.metaweather.com/static/img/weather/' +
							weather.weather_state_abbr +
							'.svg'
						}
						type="image/svg+xml"
					>
						somthing
					</object>
				</Col>
			</Row>
			<Row className="mt-3 mb-2">
				<Col>{parseInt(weather.min_temp)}°C</Col>
			</Row>
			<Row className="mt-3 mb-4">
				<Col>{parseInt(weather.max_temp)}°C</Col>{' '}
			</Row>
			<Row className="mt-3 mb-5">
				<Col>{parseInt(weather.wind_speed)} Kph</Col>{' '}
			</Row>
		</Container>
	));

	const backgroundImage = () => {
		const weatherState = [c, h, hc, hr, lc, lr, s, sn, t, sl];
		for (let i = 0; i < 10; i++) {
			const value = String(weatherState[i]).includes(
				currentWeth.consolidated_weather[0].weather_state_abbr
			);
			if (value) {
				return weatherState[i];
			}
		}
	};
	const sectionStyle = {
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		backgroundSize: 'cover',
		backgroundImage: `url(${backgroundImage()})`,
	};
	return (
		<Container fluid={true} className="img" style={sectionStyle}>
			{/* components come here */}

			<Container className="transbox">
				<CityInfo currentWeth={currentWeth} />
				<StatusBar currentWeth={currentWeth} />

				<WeeklyForecast forecastWeather={forecastData} />
				{/* <Form>
					<Row noGutters className="justify-content-md-center">
						<Col sm="2">
							<Form.Control
								ref={location}
								size="sm"
								type="search"
								placeholder="type the city..."
							/>
						</Col>
						<Col md="auto">
							<Button
								variant="outline-success"
								size="sm"
								type="submit"
								onClick={getLocation}
							>
								search
							</Button>
						</Col>
					</Row>
				</Form> */}
			</Container>
		</Container>
	);
}
