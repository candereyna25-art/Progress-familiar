export function drawChart(canvas,rows,type){
 const ctx=canvas.getContext('2d'),w=canvas.clientWidth,h=240,d=devicePixelRatio||1;
 canvas.width=w*d;canvas.height=h*d;ctx.scale(d,d);ctx.clearRect(0,0,w,h);
 const source=type==='weight'?rows:type==='waist'?rows.filter(r=>r.waist_cm!=null):rows.filter(r=>r.anxiety_score!=null);
 const vals=source.map(r=>type==='weight'?Number(r.weight_kg):type==='waist'?Number(r.waist_cm):Number(r.anxiety_score));
 if(!vals.length){ctx.fillStyle='#74818a';ctx.textAlign='center';ctx.fillText('Sin datos',w/2,h/2);return}
 const mn=Math.min(...vals)-1,mx=Math.max(...vals)+1,px=i=>35+(vals.length===1?(w-50)/2:i*(w-50)/(vals.length-1)),py=n=>15+(mx-n)*(h-45)/(mx-mn);
 ctx.strokeStyle='#167d7f';ctx.lineWidth=3;ctx.beginPath();vals.forEach((n,i)=>i?ctx.lineTo(px(i),py(n)):ctx.moveTo(px(i),py(n)));ctx.stroke();
 vals.forEach((n,i)=>{ctx.fillStyle='#ed7c5c';ctx.beginPath();ctx.arc(px(i),py(n),4,0,7);ctx.fill()});
}