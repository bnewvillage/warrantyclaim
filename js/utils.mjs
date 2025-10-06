export function callWorkerAPI(){
    fetch('https://uae.oldtimerwarranties.workers.dev/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error);
}