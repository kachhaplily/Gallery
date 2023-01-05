let myphotos = [];

fetchdata = async (inputname, page) => {
    const API_key = '563492ad6f91700001000001a50248a19756492687753a2523d04a50';
    const fecthdata = await fetch(`https://api.pexels.com/v1/search?query=${inputname}&page=${page}&per_page=12`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: API_key,
        }
    })

    let data = await fecthdata.json()
    myphotos=data;
    gallery(myphotos.photos);
}
gallery = (y) => {
    document.getElementById("Gallery").innerHTML = y.map((ele) => {
        for (const key in ele) {
            if (typeof ele[key] === 'object') {
                for (const i in ele[key]) {
                    if (i == 'original') {
                        return `<div  class="photo"> <img src="${ele[key][i]}">
                        <a href="${ele[key][i]}"target="_blank">download</a>
                        </div>`
                    }

                }
            }
        }


    }).join(" ");
    const a = document.createElement('a')
    const div = document.createElement('div')
    const txtnode = document.createTextNode("LoadMore")
    a.appendChild(txtnode);
    a.setAttribute('onclick', 'loadmore()');
    a.setAttribute('class','load')
    div.setAttribute('class','loaddiv')
    div.appendChild(a);
    document.getElementById('Gallery').append(div);

}

SearchPhoto = () => {
    let inputName = document.querySelector('#inputName').value;
    if (inputName.length == 0) {
        const div = document.createElement("div");
        const p = document.createElement("h1");
        const node = document.createTextNode("oop! input field can't be empty.");
        p.appendChild(node);
        div.appendChild(p);
        document.getElementById('Gallery').append(div);
    }
    else {
        let count = 1;
        fetchdata(inputName, count)
   
        loadmore = () => {
            count += 1;
            fetchdata(inputName, count);

        }
    }
}



