import { DragDropContext,Droppable,Draggable   } from 'react-beautiful-dnd';
import React, { useState } from 'react';
import PlanningCard from"./PlanningCard"


const finalSpaceCharacters = [              // Essai d'un drag and drop (pas important pour l'instant)
    {
      id: 'gary',
      name: 'Gary Goodspeed',
    card:<PlanningCard godfatherName="Michel" laureateName="bui"/>
    },

    {
      id: 'kvn',
      name: 'KVN',
     card:<PlanningCard godfatherName="lop" laureateName="ghy"/>
    },
    {
        id: 'ki',
        name: 'KVN',
        card:<PlanningCard godfatherName="hello" laureateName="everyone"/>
    }
  ]

function Planning()
{
    const [characters, updateCharacters] = useState(finalSpaceCharacters);

    function handleOnDragEnd(result) {
        if (!result.destination) return;
    
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        updateCharacters(items);
      }

        return <div>
        <DragDropContext  onDragEnd={handleOnDragEnd}>
            
            <Droppable droppableId="characters">
                {(provided) =>(
            <div>
            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
            {characters.map(({id,card},index) => {
              return (
                 
                  <Draggable  key={id} draggableId={id} index={index}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="container">
                            {card}
                        </div>
                    </div>
                )}
                    </Draggable>
              );
            })}
          </ul></div>
                )}
        </Droppable>
             
            
                </DragDropContext>
      </div>
    }


export default Planning