import React, { useEffect, useState } from "react";
const AllToDos = () => {
	const [input, setInput] = useState("");

	const [todo, setTodo] = useState([
		{
			label: "",
			done: false
		}
	]);

	const [isHovering, setIsHovering] = useState(-1);

	const urlBase = "https://assets.breatheco.de/apis/fake/todos/user";

	const verifyUser = async () => {
		try {
			let response = await fetch(`${urlBase}/ElPiamo`, {
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				getTasks();
			}
		} catch (error) {
			console.log(error, "explote sorry");
		}
	};

	const getTasks = async () => {
		try {
			let response = await fetch(`${urlBase}/ElPiamo`);
			if (response.ok) {
				let resultado = await response.json();
				setTodo(resultado);
				setInput("");
			} else {
				verifyUser();
			}
		} catch (error) {
			console.log(error, "explote sorry");
		}
	};
	const addTasks = async e => {
		try {
			if (e.key == "Enter") {
				if (input.trim() != "") {
					let response = await fetch(`${urlBase}/ElPiamo`, {
						method: "PUT",
						body: JSON.stringify([
							...todo,
							{ label: input, done: false }
						]),
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (response.ok) {
						getTasks();
					}
				}
			}
		} catch (error) {
			console.log(error, "explote sorry");
		}
	};

	const deleteTasks = async idtodelete => {
		try {
			const newTodo = todo.filter((tarea, i) => i !== idtodelete);
			let response = await fetch(`${urlBase}/ElPiamo`, {
				method: "PUT",
				body: JSON.stringify(newTodo),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				getTasks();
			}
		} catch (error) {
			console.log(error, "explote sorry");
		}
	};
	useEffect(() => {
		getTasks();
	}, []);
	return (
		<div className="text-center">
			<h1 className="mainTitle">{`To Do's`}</h1>
			<div className="theFormat">
				<ul className="tasksLists">
					<form onSubmit={e => e.preventDefault()}>
						{todo.length == 0 ? (
							<input
								className="inputData"
								type="text"
								placeholder="No tasks, add a task"
								value={input}
								name="text"
								onChange={e => setInput(e.target.value)}
								onKeyDown={addTasks}
							/>
						) : (
							<input
								className="inputData"
								type="text"
								placeholder="Type the tasks that need to be done"
								value={input}
								name="text"
								onChange={e => setInput(e.target.value)}
								onKeyDown={addTasks}
							/>
						)}
					</form>
					{todo.map((tarea, i) => {
						return (
							<div
								className="eachElement"
								key={i}
								onMouseEnter={() => setIsHovering(i)}
								onMouseLeave={() => setIsHovering(-1)}>
								{" "}
								{tarea.label}
								<div
									onClick={() => {
										deleteTasks(i);
									}}
									className={
										isHovering === i
											? "text-danger"
											: "taskNoHovering text-light"
									}>
									<i className="fas fa-trash-alt "></i>
								</div>
							</div>
						);
					})}
					<div className="tasksLeftText">
						{todo.length == 1
							? `    ${todo.length} item left`
							: `    ${todo.length} items left`}
					</div>
				</ul>
			</div>
		</div>
	);
};
export default AllToDos;
