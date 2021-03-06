import { DarukServer } from '../../';
import './entity/info';
import './db/IpInfoDb';
import './controllers/main';

const main = async function () {
  try {
    const app = DarukServer();
    await app.binding();
    app.listen(8898);
  } catch (error) {
    console.log(error);
  }
};

main();
/**
[
		{
		url: "http://127.0.0.1:8898",
		method: "get",
		result: "主页面"
	}，
	{
		url: "http://127.0.0.1:8898",
		method: "post",
		body: {
			name: "名称",
			address: "IP地址"
		},
		result: IpInfo[]
	}
]
 */
