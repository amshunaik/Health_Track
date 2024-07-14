export interface Workout{
    
    type:String,
    minutes:number
     
}
export interface Healthdata {
    
    id: number;
    name: string;
    workouts:Workout[]
    
   
      
}