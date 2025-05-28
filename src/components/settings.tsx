import Modal from "@/components/custom-ui/modal"
import useSettingsStore from "@/store/settingsStore"

export default function Settings() {
    
    const {open, toggle} = useSettingsStore();


    function close(){
        toggle()
    }

    return (
        <>
            {open && <Modal title="Setting" close={close} bodyContent={
                <div>
                    <div className="font-semibold text-sm">Time: </div>
                </div>
            }>
                
            </Modal>}
        </>
    )
}