import { ToastController } from "@ionic/angular";

export class Utils 
{
    constructor(private toastController : ToastController) {}

    public async showMessage(message: string) 
    {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        })

        await toast.present();
    }
}
