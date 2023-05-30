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

    const fileReader = new FileReader();
    fileReader.addEventListener('load',(e)=>{
        imageElm.css('background-image', `url(${fileReader.result})`);
    })
    fileReader.readAsDataURL(imgFile);
    btnUpload.removeAttr('disabled');

}
function uploadImage() {
    pgbElm.css('width', '0%');
    progressElm.text("0%");



}