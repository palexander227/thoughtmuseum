/*
document.querySelector('.add-new-workspace').addEventListener('submit', function (event) {
    // Prevent default submti event behaviour (reload page)
    event.preventDefault();

    const name = this.querySelector('[name="name"]').value;
    const description = this.querySelector('[name="description"]').value;

    fetch('/new-workspace', {
        body: JSON.stringify({ name, description }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(res => console.log('Response:', res));

    console.log('Submitted!')
});
*/