export function healthScore(e){
 if(!e)return null;let s=20;
 s+=Math.min(20,(e.water_liters||0)/3*20);
 s+=Math.min(15,(e.sleep_hours||0)/7*15);
 s+=Math.min(15,(((e.exercise_minutes||0)/150)+((e.walking_days||0)/7))/2*15);
 s+=e.anxiety_score!=null?Math.max(0,(10-e.anxiety_score)):0;
 s+=e.had_chips===false?10:0;
 s+=(e.notes||'').includes('[DIETA_OK]')?10:0;
 return Math.round(Math.min(100,s));
}
export function bmi(weight,heightCm){return heightCm?weight/((heightCm/100)**2):null}
export function bmiClass(x){if(x<18.5)return'Bajo';if(x<25)return'Rango habitual';if(x<30)return'Sobrepeso';if(x<35)return'Obesidad I';if(x<40)return'Obesidad II';return'Obesidad III'}
export function waistHeight(waist,heightCm){return waist&&heightCm?waist/heightCm:null}