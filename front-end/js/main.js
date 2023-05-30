/*Module variables,constants*/
const btnSelectImage=$("#btn-select-image"),
    fileChooser = $('#file-chooser'),
    imageElm =$('#image'),
    fileNameElm =$('#file-name'),
    fileSize =$('#file-size'),
    btnUpload =$('#btn-upload'),
    progressElm =$('#progress'),
    pgbElm =$('#pgb');


btnUpload.attr('disabled');


btnSelectImage.on('click',()=>fileChooser.trigger("click"))
fileChooser.on('change',()=>setImagePreview())
btnUpload.on('click',()=>uploadImage())



function  setImagePreview(){
    const fileList=fileChooser[0].files;
    if (!fileList.length) return;
    const imgFile = fileList[0];
    fileNameElm.text(fileList[0].name);
    fileSize.text(`${(fileList[0].size/1024).toFixed(2)} KBs`);
    btnUpload.removeAttr('disabled');

    const fileReader = new FileReader();
    fileReader.addEventListener('load',(e)=>{
        imageElm.css('background-image', `url(${fileReader.result})`);
    })
    fileReader.readAsDataURL(imgFile);

}
function uploadImage() {
    pgbElm.css('width', '0%');
    progressElm.text("0%");
    const fileList=fileChooser[0].files;
    if (!fileList.length) return;

    const xhr = new XMLHttpRequest();
    const xhrUpload = xhr.upload;

    xhrUpload.addEventListener("progress", (e) => {
        const uploadedSize = e.loaded;
        const totalSize = e.total;
        const progress = (uploadedSize/totalSize*100).toFixed(2) + "%";
        pgbElm.css("width", progress);
        progressElm.text(progress);
    });

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState===xhr.DONE){
            if (xhr.status===201){
                progressElm.text("Successfully Uploaded!");
                pgbElm.css("width", "100%");
            }else {
                progressElm.text("Failed to Upload, Try again!");
                pgbElm.css("width", "5%");
            }
        }

    });
    xhr.open("POST", 'http://localhost:8080/gallery/uploads', true);
    const formData = new FormData();
    formData.append("image", fileList[0]);
    xhr.send(formData);



}