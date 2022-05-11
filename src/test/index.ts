'use strict';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';

export const expect = chai.expect;

chai.use(chaiAsPromised);
chai.use(chaiHttp);