import { GetRequest } from 'quick-d/lib/common/Request'
import { Controller } from 'quick-d/lib/common/Controller'
import { Query } from 'quick-d/lib/common/BodyParam'
import { AutoWired } from 'quick-d/lib/common/Component'

import UserModel from '@/model/UserModel'

@Controller('/home')
class Home {
  @AutoWired()
  static userModel: UserModel

  @GetRequest('/hello')
  async hello (ctx) {
    console.log(ctx)
    return `
      <h1>Hello world</h1>
    `
  }
  @GetRequest('/register')
  async registerNewUser (
    @Query('name', true) name,
    @Query('nickName', true) nickName,
    @Query('password', true) password
  ) {
    console.log(await this.userModel.addUser(
      name, nickName, password
    ))

    return {
      name, nickName, password
    }
  }
}
