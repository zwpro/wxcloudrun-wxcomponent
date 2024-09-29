import {useEffect} from "react";
import {request} from "../../utils/axios";
import {getComponentInfoRequest, getPreAuthCodeRequest} from "../../utils/apis";
import {routes} from "../../config/route";

export default function AuthPageH5() {

    useEffect(() => {
        jumpAuthPage()
    }, [])

    const jumpAuthPage = async () => {
        let redirectUrl = ''
        const resp = await request({
            request: getComponentInfoRequest,
            noNeedCheckLogin: true
        })
        if (resp.code === 0) {
            const resp1 = await request({
                request: getPreAuthCodeRequest,
                noNeedCheckLogin: true
            })
            if (resp.data.redirectUrl) {
                redirectUrl = resp.data.redirectUrl.includes(window.location.origin) ? resp.data.redirectUrl : `${window.location.origin}/#${routes.redirectPage.path}`
            }
            if (resp1.code === 0) {
                window.location.href = `https://open.weixin.qq.com/wxaopen/safe/bindcomponent?component_appid=${resp.data.appid}&pre_auth_code=${resp1.data.preAuthCode}&auth_type=6&redirect_uri=${encodeURIComponent(redirectUrl)}#wechat_redirect`
            }
        }
    }

    return (
        <div />
    )
}
