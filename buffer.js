const axios = require('axios');

require('dotenv').config();

class CircleBuffer {
  arrayBuffer = [];
  k = 0;
  ind = 0;

  /*
  * Fetch array of items from airtable.com
  * */
  async fetchData() {
    try {
      const res = await axios({
        method: 'get',
        url: `https://api.airtable.com/v0/${process.env.APP}/MainTable?view=Grid%20view`,
        headers: {
          'Authorization': `Bearer ${process.env.KEY}`,
        }
      });

      const data = res.data.records;
      this.arrayBuffer = data.map(item => item.fields.title);

      this.k = this.arrayBuffer.length - 1;
    } catch (e) {
      console.log(e);
    }
  }

  /*
  * Get next values from fetched data
  *
  * @param count - number of values to get
  * @return array with requested number of items
  *
  * */
  async getData(count) {
    await this.fetchData();

    const buffer = [];

    for (let i = 0; i < count; i++) {
      if (this.ind + i <= this.k) {
        buffer.push(this.arrayBuffer[this.ind + i]);
      } else {
        buffer.push(this.arrayBuffer[0]);
      }
    }

    this.ind = (this.ind+1 > this.k) ? 0: ++this.ind;

    return buffer;
  }
}

const buffer = new CircleBuffer();

module.exports = async (count) => await buffer.getData(count);
