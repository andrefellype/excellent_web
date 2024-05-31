import { useParams } from "react-router"
import FailView from "./failView.page"
import { useTranslation } from "react-i18next";

const FailPage = () => {
    const { t } = useTranslation()
    const { typeFail, msgFail } = useParams()

    const getTypeFail = () => {
        if (typeof typeFail !== "undefined") {
            if (typeFail === "error_api") {
                if (typeof msgFail !== "undefined") return msgFail
                return t('message.alert.fail_system')
            }
            return typeFail
        }
        return ""
    }

    return <FailView title={getTypeFail()} />
}

export default FailPage