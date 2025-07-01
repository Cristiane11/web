import React from 'react';
import projects from './projectData';


export default function Project(){
    return(
        <div className="#">
            <section >
                {projects.map(item=>(
                <p key={item.id}>
                {item.title} 
                {item.description} 
                {item.coverImg} 
                {item.link} 
                </p>  
            ))};
            </section> 
        </div>   
    );
};