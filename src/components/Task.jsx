import { useTaskStore } from "../stores/useTaskStore";
import styled from "styled-components";


const TaskContainer = styled.div`
  display: flex; 
  flex-direction: column;
  justify-content: space-between; 
  background-color: ${(props) => (props.completed ? "#cfc" : "#bea9df")}; // Green for completed, #bea9df purple for incomplete
  padding: 1rem;
  width: 250px;
  height: 250px;
  max-width: 100%; 
  box-shadow: 5px 5px 7px #000;
  position: relative;
  word-wrap: break-word; /* Ensure long words in the task box/post it break and wrap */
  margin: 30px auto;
  padding: 20px;
  box-shadow: 
    inset 0 -40px 40px rgba(0, 0, 0, 0.2),
    inset 0 15px 10px rgba(0, 0, 0, 0.2),
    0 5px 6px 5px rgba(0, 0, 0, 0.2);


  /* Adjust size for smaller screens */
  @media (max-width: 800px) {
    width: 490px; 
    max-width: 100%; 
    height: auto; 
    padding: 0.8rem;
  }
`;
// Use styled-components' shouldForwardProp utility to prevent "completed" from being forwarded to the DOM
TaskContainer.defaultProps = {
  as: ({ completed, ...props }) => <div {...props} />, // Remove "completed" when rendering

};

const CheckMark = styled.i`
  margin-right: 30px; // Space between checkbox and task title
  font-size: 30px; 
  cursor: pointer;
  color: ${(props) => (props.completed ? "#28a745" : "#000")}; /* Green for completed, black otherwise */

`

const H2 = styled.h2`
 font-size: 20px;
 font-family: "Indie Flower", cursive;  
 font-weight: 500;
 text-align: center; 
 margin: 0; 
`
const StyledP = styled.p`
 font-size: 11px;
 font-family: "Poppins"; 
 font-weight: 400;
 margin: 0;
 text-align: left; 
 padding-top: 10px; 
`

const TrashIcon = styled.i`
  cursor: pointer;
  font-size: 22px; /* Size of the icon */
  color: black; 
  margin: 5px 0px 10px 5px; /* Adds space between the icon and content */
  &:hover {
    color: #d32f2f; 
  }
  transition: color 0.3s ease;
  position: absolute; 
  top: 10px; 
  right: 10px; 
`;

export const Task = ({ task }) => {
  const { toggleTask, removeTask } = useTaskStore();

  return (
    <TaskContainer completed={task.completed}>
      {/* Checkbox to toggle task completion */}
      <CheckMark
        className={`fa ${task.completed ? "fa-check-square" : "fa-square-o"}`}
        completed={task.completed}
        role="checkbox"
        aria-checked={task.completed} // Describes the checked state
        aria-label={task.completed ? "Mark task as incomplete" : "Mark task as completed"}
        onClick={() => toggleTask(task.id)}
      />
      <H2 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.title}
      </H2>
      <TrashIcon
        className="fa fa-trash-o"
        onClick={() => removeTask(task.id)}
      />
      <StyledP>Created: {new Date(task.createdAt).toLocaleDateString("en-GB")} at {new Date(task.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</StyledP>
      {/* "en-gb" gives the date in the format dd/mm/yyyy (or your region's default date format. */}
    </TaskContainer>
  );
};
