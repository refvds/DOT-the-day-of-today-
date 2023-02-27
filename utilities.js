
export const convertURL2Base64 = async function (imgUrl) {
    const data = await fetch(imgUrl);
    const blob = await data.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64Data = reader.result;
            resolve(base64Data);
        }
    });
}

export const fetchedData = async function(url, headers) {
    const photos = [];
  await fetch(url, headers)
    .then(result => result.json())
    .then((resolve) => {
        const promises = resolve.photos.map((userData) => {
            const converted = convertURL2Base64(userData.src.large2x)
            return converted
        });
        Promise.all(promises).then(value=>photos.push(value.forEach((elem, index)=>photos.push({id: index, img: elem})))).then(()=>photos.pop())

    });

    return photos;
}