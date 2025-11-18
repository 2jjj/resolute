//functions

module.exports = {
  getMember: function (message, toFind = "") {
    try {
      toFind = toFind.toLowerCase();
      let target = message.guild.members.get(toFind);
      if (!target && message.mentions.members) target = message.mentions.members.first();
      if (!target && toFind) {
        target = message.guild.members.find((member) => {
          return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
        });
      }
      if (!target) target = message.member;
      return target;
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  formatDate: function (date) {
    try {
      return new Intl.DateTimeFormat("en-US").format(date);
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  duration: function (ms) {
    let d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;

    if (d) {
      return `${d} Dias, ${h} Horas, ${m} Minutos, ${s} Segundos`
    } else if (h) {
      return `${h} Horas, ${m} Minutos, ${s} Segundos`
    } else if (m) {
      return `${m} Minutos, ${s} Segundos`
    } else {
      return `${s} Segundos`
    }
  }
}