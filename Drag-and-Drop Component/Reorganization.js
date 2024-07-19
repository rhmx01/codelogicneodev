import React, {useState, useCallback} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {OpenWith} from "@material-ui/icons";
import clsx from "clsx";
import PropTypes from 'prop-types';

function Reorganization({question, questions, setQuestions}) {
/*
The Reorganization component is a quiz game question type where users are presented with various instructions and categories. The task is to drag and drop each instruction into the correct category,
*/
  const instr = question.groups.flatMap(g => 
    g.options.map(o => ({...o, group: {id: null}}))
  );
  
  const [instructions, setInstructions] = useState(instr);
  
  const bgcolors = ['bg-blue-200', "bg-yellow-100 ", "bg-purple-200 ", "bg-orange-200 "];
  const bggcolors = ['bg-blue-300', "bg-yellow-300 ", "bg-purple-300 ", "bg-orange-300 "];
  const bgggcolors = ['bg-blue-600', "bg-yellow-600 ", "bg-purple-600 ", "bg-orange-600 "];
  const grid = ['grid-cols-2', 'grid-cols-3', 'grid-cols-4'];

  const onDragEnd = useCallback((result) => {
    const {source, destination} = result;
    if (!destination) {
      return;
    }

    let instruction = instructions.find(inst => inst.id === parseInt(result.draggableId));
    instruction.group.id = destination.droppableId;
    const updatedInstructions = [
      ...instructions.filter(ins => ins.id !== instruction.id),
      instruction
    ];
    setInstructions(updatedInstructions);

    const tmpgroups = question.groups.map(g => ({
      ...g, 
      options: updatedInstructions.filter(inst => inst.group.id === g.id)
    }));
    setQuestions([
      ...questions.filter(q => q.id !== question.id), 
      {...question, groups: tmpgroups}
    ]);
  }, [instructions, question, questions, setQuestions]);

  return (
    <div className='rounded-md bg-bs-light p-4 mb-2'>
      <DragDropContext onDragEnd={onDragEnd}>
        <h4 className='block text-gray-700 font-bold mb-2'>{question.question}</h4>
        <div>
          <Droppable droppableId="instructions">
            {(provided) => (
              <div
                className='grid grid-cols-4 text-center gap-4'
                {...provided.droppableProps} ref={provided.innerRef}>
                {instructions.filter(inst => inst.group.id === null).map((instruction, index) => (
                  <Draggable
                    key={instruction.id}
                    draggableId={instruction.id.toString()}
                    index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className='w-full h-full text-center hover:bg-gray-200 bg-white text-gray-700 p-2 rounded-lg shadow-md m-2 flex items-center'
                      >
                        <OpenWith/>
                        <span className='mx-auto'>{instruction.name}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>)}
          </Droppable>
          <div className={clsx('grid grid-cols-2 gap-4 lg:gap-8 mt-8', grid[question.groups.length - 2])}>
            {question.groups.map((qg, gi) =>
              <div key={qg.id}>
                <Droppable droppableId={qg.id}>
                  {(provided) => (
                    <div className={clsx('grid grid-cols-2 gap-4 w-full rounded-lg shadow-md pb-4', bgcolors[gi])}
                         {...provided.droppableProps} ref={provided.innerRef}>
                      <div
                        className={clsx("w-full text-xl text-white font-bold col-span-2 rounded-t-lg h-16 flex items-center", bgggcolors[gi])}>
                        <span className="mx-auto">{qg.name}</span></div>
                      {instructions.filter(inst => inst.group.id === qg.id).map((instruction, index) => (
                        <Draggable
                          key={instruction.id}
                          draggableId={instruction.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className='p-2'
                              {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                              <div className={clsx("w-full h-full text-center text-gray-700 p-2 rounded-lg shadow-md flex items-center", bggcolors[gi])}>
                                <OpenWith/> <span className='mx-auto'>{instruction.name}</span></div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </div>
            )}
          </div>
          <ToastContainer/>
        </div>
      </DragDropContext>
    </div>
  )
}

Reorganization.propTypes = {
  question: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  setQuestions: PropTypes.func.isRequired,
};

export default Reorganization;
