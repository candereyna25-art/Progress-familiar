export function coachText(e){
 const tips=[];if((e.water_liters||0)<2.5)tips.push('subir agua');
 if((e.sleep_hours||0)<7)tips.push('mejorar sueño');
 if((e.anxiety_score||0)>=7)tips.push('preparar una colación');
 if(e.had_chips)tips.push('llevar jícama o manzana');
 return tips.length?'Principal enfoque: '+tips.slice(0,2).join(' y ')+'.':'Vas bien. Mantén el mismo plan esta semana.';
}