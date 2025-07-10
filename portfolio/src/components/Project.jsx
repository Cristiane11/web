import React from 'react';
import projects from '../data/projectData';



export default function Project(){
    
    return(
        <>

        <div className="container">
        
            <section className="container">
                {projects.map(item=>(
                <p key={item.id}>
                {item.title} 
                {item.description} 
                {item.coverImg} 
                {item.link} 
                </p>
            ))}
            </section> 
        </div>  

         </> 
    );
};