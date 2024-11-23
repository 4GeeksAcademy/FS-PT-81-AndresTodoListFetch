import React, { useEffect, useState } from "react";


function Home() {
	const [work, setWork] = useState('');
	const [tarea, setTarea] = useState([]);
	const [username, setUsername] = useState('andrew27');
	const [userData, setUserData] = useState();
	const url = 'https://playground.4geeks.com/todo';



	const getDataAsync = async () => {
		try {
			const resp = await fetch(url + '/users/' + username);
			if (resp.status == 404) return createUser('something went wrong')
			if (!resp.ok) throw new Error('something went wrong')
			const data = await resp.json();
			setUserData(data)
		} catch (error) {
			console.error(error)

		}

	}
	const createUser = async () => {
		try {
			const resp = await fetch(url + '/users/' + username, {
				method: 'POST',
				header: {
					'Content-type': 'application/json'
				},
			});
			if (!resp, ok)
				throw new Error("Something went wrong with username");
			const data = await resp.json();
			getDataAsync();
		} catch (error) {
			console.error('error');
		}
	}


	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const resp = await fetch(url + '/todos/' + username, {
				method: 'POST',
				header: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify({
					label: tarea,
					is_done: false,
				})
			});
			if (!resp, ok)
				throw new Error("Something went wrong with Tarea");
			const data = await resp.json();
			getDataAsync();
			setTarea('')
		} catch (error) {
			console.error('error');
		}
	}

	const handleDelete = async (todo_id) => {
		try {
			const resp = await fetch(url + '/todos/' + todo_id, {
				method: 'DELETE',
			});
			if (!resp, ok)
				throw new Error("Something went wrong with username");
			getDataAsync();
		} catch (error) {
			console.error('error');
		}
	}

	const HandleChange = e => setWork(e.target.value);

	const handleKeyDown = e => {
		if (e.key === "Enter") {
			setTarea([...tarea, work]);
			setWork("");
		};
	};


	useEffect(( )=> {
		getDataAsync()
	},[tarea])

	return (
		<div className="fondo">
			<div className="container">
				<div className="text-center">
					<h1>TODO LIST</h1>
					<input type="text" onChange={HandleChange} onKeyDown={(e) => handleKeyDown(e)} value={work} />
					<ul>
						{tarea.map((item, index) => (
							<div className="items" key={index}>
								<li>{item}</li>
								<button onClick={() => { handleDelete(index); }}>X</button>
							</div>))}
					</ul>
					<p className="item">{tarea.length} {tarea.length === 1 ? "item" : "items"}</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
