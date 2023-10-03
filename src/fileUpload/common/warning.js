import swal from 'sweetalert';

export default function Warning(text){
    swal({
        title: "Error",
        text: text,
        icon: "warning",
        dangerMode: true,
    })
}