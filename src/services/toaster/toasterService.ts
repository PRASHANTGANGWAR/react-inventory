import toast, { Toaster } from 'react-hot-toast';


class ToasterService {
    private config:any;
    public Toaster;
    constructor() {
        this.Toaster = Toaster;
        this.config = {
            duration: 2000,
            position: 'center-top',
            // Styling
            style: {}
          

            // className: '',
            // icon: '👏',

            // Change colors of success/error/loading icon
            // iconTheme: {
            //     primary: '#000',
            //     secondary: '#fff',
            // },

            // Aria
            // ariaProps: {
            //     role: 'status',
            //     'aria-live': 'polite',
            // },
    
        }
    }

    public info(message: string) {
        this.config.style = {
            background: 'white',
            color: "black"
        }
        return toast(message, this.config);
    }
    public success(message: string) {
        this.config.style = {
            background: '#07bc0ccf',
            color: "white"
        }
        return toast.success(message, this.config);
    }

    public error(message: string, minWidth = "250px") {
        this.config.style = {
            background: '#e74c3c',
            color: "white",
            minWidth: minWidth, 
        }
        this.config.duration = 5000;
        return toast.error(message, this.config);
    }

    public custom(tags: string) {
        return toast.custom(tags, this.config);
    }

    public loading(message: string) {
        return toast.loading(message, this.config);
    }
}

export default ToasterService;

