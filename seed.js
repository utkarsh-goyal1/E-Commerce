const mongoose = require('mongoose');
const Product = require('./models/Product');

let products = [
    {
        name:"Iphone 15 Pro Max" ,
        img: "data:image/jpeg;base64,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",
        price: 150000 ,
        desc: "Designed By Apple"
    },{
        name:"Galaxy S23 Ultra" ,
        img: "data:image/jpeg;base64,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",
        price: 125000,
        desc:"Designed By Samsung"
    },{
        name:"Pixel 8 Pro" ,
        img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQDw8PDxAPEA8PDw0NDQ8PDQ8NDQ0NFREWFhURFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGC0dHR0uLS8tLi0tLS0tKy0rLS0tKy0tLS0tLSsrLSstLS0tLS0tLS0rKy0tKy0tLS8tLi03Lf/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAAAQIDBAYFBwj/xAA7EAACAgEBBAcFBwMDBQAAAAAAAQIDEQQFEiExBhNBUXGBkQciMmGhFEJScoKxwSMzkjTR8BZTc6Lh/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAECAwQFBv/EACsRAQACAgEDAgUEAwEAAAAAAAABAgMRMQQSQQUhEzJRkbFCUmGBMzTwIv/aAAwDAQACEQMRAD8A4pCcRoZrY1MoEXEvE0I4U4JJknEjgRpxkWJlAusGWmnJXOwpdxTZaEyIhO2xGG6whdeYrbiu1ltarp3FErSmUxKRX3rO05vJW6y0BcmzSrIbpraIOAtGzonGQ3EjgQWJjK8jUh7CyJppMsTXSKQ30suyU1FyIJIsEieBqIbAQwBgRNkJEmRaGSADwABvjYWxmZiSZtZNNIFMZk1MAsISaITsM9lwbPSdsjJO4hbqTHbcQmyUVapXlUrzG7Q3iHcs7U7J5KZRJ5AjMbShTgMF26JwITCSkkpDcSDQgnkGVZJReXhcX3LiyUSDaIOJN8Hh8H3NYfoAaCloRc0RcRaCMGbqDHFGykQb6i+JnqLkxSa1AyKYZEaWSORCyASEyORNjIARyABv3BPgScyqyxGxkgpWEHcZ7rDJO8jMpRV6E7zHfaZ3cVTnkjNkoqVlrKt5kt0e6VyshBEsiaIkdGmplkWV6eidkt2qE7JfhrhKyXojotn9B9fZhyrjRHhxumovH5Y5frgspS1uI2he9a/NOniImd3oegenhh6jUTtfbCqKqg/k28v0we5o9Bo9P/Z09akuU5rrLP8AKWWaq9Fktz7Ml+uxV493zbRbD1N/9qi2a/Fu7sP8pYR7mk9nl0uOouqpX4Yp3Tx9EvVnb2a2T7SiU2+0009PpHzTtjyepWn5Y08rR9Dtn04c42aiS/7s8Qz+WOE/PJ7VNkKlu0VV1RXZXCMf2KBqBsphpTiGK/U5L8yr19cL4uF0I2RfZKKfo+w+Z9JNkfZbcRy6p5dbfFrvi2fVatLKTxGMpPujFyfojn+nGjhGEtPfmu5wVtalCWU/uvlwT5ebKOrxUtSeImOGjos2Sl45mJ5fM8jTKck4yOK762JpqMsDXSiMm11stiyFcS6MCJgMj3R7ojRyRZNoiwIhDwGACIDwAwssuMluoKrrDHbNmibKK1XW6gzTsKmxlU2WxCSmWKRSMIk16J1VuTUYpylJqMYxTcpSfJJLmzPGR3Xs00actRrJLP2dVVVN8d221Tbl47sGv1Mtx177RX6qsluys2+iOg9n9rSlqrYUJ8eriutuS+fZF+p7mj6K7Opw3XK+S7bpuUX+hYj9D0bLnJ5bIo7FOkx18bcPJ1uW3E6aq9SoR3aoQriuUa4qC9EVTvk+bZBRLaqJSeIpyfck2/oaIiIZZtayriCR7mj6M6mz7m4u+x7v05/Q037N0Ol/1msrjJcerjJKb/SsyfoV2z0r5W06bJbw5xQNuj2Rfb/bqnJd+MR/yfAsv6d7Oo4aTSSukuVlmK4+Kcsy+iPD2j7RNoXcIThp491MFvY7t6WX6YM9ur/bH3aa9BH6rfZ2uj6GWPDtnCC7op2S/hHuaPotpa+LjKx985cPRYR8XhtzWqW/9r1W9zz9ptf8ne9B+nk7bIaXWtOU2o034UXKfZCaXDL5Jrt4fMz3zZbeWvH0+GvEfd023NfPTblWlrpg5Rc5SnB7kY5wkoxay+fbw+eTg/aBVPW6Z3zqjHU6NR6115dd2ksbSnHPFYknlccb2cn1LX7Phco72VKLzCUcb0e/nwaPPhoNNCN1U3KfWwdNspRbiq+K3cpYill/8RTuJj+V+p3/AA/Keuo3Zvuf7lMUdV0w2JLTai6iXOubUX+KHOEl4p/U5rcM1o1LRW24OtG7TwMtUT0NOVylDVXAsSFFkmyKQERySSDQJoi0W4E0GgqwDiWYE0AV4AngADw3LJFxIxkWIu2hpU4EXEvwLdFo9s4y5wIOAaG0UfQvZRqIzjtDZ74T1NENRpn336duTj5xb9GfPlE37G2jZpdRTqaniyiyNsfnh8Y+ayvMdLTW0THgr1i1ZrPl9L0tix7z3Uubk8JeOTqNkdHJXcXOMF4b8mfN/aDRi2MqpSlpdRXXrNK28qULFvce9ptryO89le3uu08ISeZ04pnnm4/cfpw8jsT1Pd8ns4teiinz+7odds/QaCrrtVJtZxHeeXOX4YwjzZyut9pe4nHRaSuqPZO3i/8ACGF9WYfapq5z16rbe5VTWq12Zn70pefBfpOR6rhnHDvMs2tbmdtkUrT5Y09PanS3X6htWam1Rf3K31NeO73MZ88nkwXb2viQksFlb+gkp4Tx3i3cMsyRsfIJKGhLhw8SKnJNKPNSUoYXvKfZh8z0Nl9HtdqcdTp7XHsnKPV14/NLCfkdx0d6D16KUdXtK+iPVtThB2KNMZrlKc5Yy13Lt7WRmUoq+jVN4W9zws+OOJhlp5ReEm12NcTmtq+0/Z1OY1St1U1wxRX/AE8/OcsLHhk5TaPtL2jdlaamnSxeUpSzqLvHLxFejCmK88Qd8tK8y2e13o9/Qp1aXGGaLsdkHJut+XL0Pil9eH4neatarVPe1epvu453Z2Pq0/lBe6vJHm9INjxVDlCKUq/e4Li49q/nyLMnSW7Jt5hRTrad8VjiXJxNlDMMTbpzmy6MN8GDQoImxJookmRyCYtjSzIiOR5AGAkwbAEMhkADnkSTIjyMlikPJTkW8OJJeNFCsJxsJxJTC5RBwFGZNSHonYbMn9r2RZS+N+y7Otq75aG6XvL9NmfKaM3QXaf2XWpN4ruxXLuTfwv1MPRPakdLrK7LP7E1PTapd+mtW7N+XCXjFC2/s+WnvtqfxU2SjlcnHPCS+X+5fitr+lOWu4fWOnXR2esrhq9PHfuqh1d1a+OytPKce9rL4dqfyPnHXyScGuTaaaxKL7V8j6t7OtvLUaauTkt5Lcs48prt8+Zs6SbW2JCTesekttXOKqhqb/BqKbXmXWjU+yms7j3fGIQlOW7GMpSfKMYuUn4JHRbL6B7Rvw1T1MX97US6r/14y+h7tntFpqThszZ0YLilO2MKY+O5Xxfm0eHr+ke1dXlWaqVUHzr0y+zx8Mr3n5slXFe3hC2aleZe/wD9E6HRpS2ltGMXz6qE41OXySeZy8kiC6X7I0nDZ+glqLF8N1kOrjn89mZ/RHI07HjnelmUnxcpPMm+9tnoVaOK7EX16X90s1utj9MNu0OnO1tTlQnXpIPkqIZsx3Oc8v0weFPZ07Zb99ll0/x22Stl6ybPYjSkTUS+mGleIZb9TktzLBTs+MeSRqhQkX4AtiFEyjGCC2tNNEwGW3zPamj6m6dfZneh+R8v9vIlpjpOmGg3oK2K41v3vnB8/Tg/U5nTyPP9Vi+HkmPHh6TpM3xccT58vRgSkiFbJMzS2IYHgYsiIAwEMhkQyLADICAA8BoWS9orlEn2o7QyLI5RIMWjDFkBAFkbC2NpmGmS2Wm2Mzr9YnrNHptQvetrX2DVPPHMI/0rJeMMLPfBnDwkdR0H1qV8tPPG7qo9XFv7t641vzeY/qLcdoi0b4V5Imazrls0exWo4c5YfNJtJ+J6On2TCPKK9DbpuDcXzTwa8HdjHWOHnLZb25lmr0yXYXxqLMAT0r2SiPA0ADYDAABAAAABiAAq1VSnFxaymmmu9HzzUad1Wzrf3XhPvj2P0PpBzPSnQ/Dauz3ZflfJ+v7mLrsXfj7o5j8N/p+bsyds8W/LxKy1MrgiZw3oA2AiSQAhkkhMCRZBsmyDAFkAwIA8dTDJm3hqwsiUdL2iLiKNhNMkiqlWQcTVgTiLR7ZQSLpVi3BaPZRRdVJpqUXiUWpRa5pp5TK0iyJEpfRaNb18K9QuDsX9T5Wr4vrn1R6VcsrJyvRLWKVVmmeFKLd9Twt6XD3457eCz5HRaSeeB3+kyd+KPrDz3W4+zNOuJagADSymAAIAAAAAAQAwEAyDZn1lCnCUXyaaNAmhTG40cTMTtw1tThKUXzi8f/SGT1+kOmw1YuT92X8M8VM85nxfDyTV6jp80ZccW/7axMkiCY8lK9PImLJFgRNkQbINgExEMjAOdyIBkyNE4yIDAl8bCxSMyJRY9lppBIrjMmpD2Wj3A3CSZINBZs3VyourtjzhJS8V2r0O50eoUsTisRlxS3t7dXYs+GDg906Ho7qMx6t848vDs/lehs6LJ2X7fEsPXYe/HuOYdfFjKNNPKLzsuEAAAAAAEaUYN/IiydvZ3DWMPCA9KwEMZEACAmXaGnVkJRfasHGuDTcXzTafid1JHNbc0u7PfXKXB+P/AD9jneoYu6sXjx+HT9Mzdt5xz5/LzMCGyJx3cPJFjItgCZBjYgBZAAAPCdYt01YE4FmkNswy2VZBwI6GyRJISROIgEiQ0gaECUy2Eyhjix7DXFnSdDa7OtlNRf2fddeqlwUVCXd3yXCXkcopH0zoNUns5P8AFbe5eC91fsTpad7gdkW9pRjF12SrlzjJxfc/mjYijWRzCu3ti+os/NFe434xx/iTonlHosd++kS8xnxfDyTWVoAImqMGGQAzjNrwHKbfgRYgGzYCbAAGIZFgCZk2jpusg129nj2GsjIjasWiYnydLTWYtHMPB0OyIuO9dJxb5QjjKXzbHq9kQxmucvCWH+xLUXONkoPseV4Mz26hrtOBkxRSZr9HrsVq3pFvq8uyOG0+a5kGadVJS95c+TMzRnmNCY1KIMOAmwIgDAAHjKwmpmcMk4lDTVkDMrCyNg9jS3cDqxRmWxkExskN0TLskZRIaG2dkclsoFcoi0kN8+t9AtJOGzYb/BWystgu3ck+GfTJ8p2fo5X3V0w+K2cYL5Z5vyWX5H3hVqFVdUeEK4RhHwSwWY490qublDdulRL4NTHdg+yN8eNb83w8zLpZtPdfBrg0+xm3btanBpPDXGL7VJcmjndkapuOJvNlcnCbfN/M6nR5dT2T5cr1PBuvxY8cuiAhXLKJM6LjHkMiAAYmwyIBJhkWQABiDImADZFjZFsCePt2h4VkVxjzXfE596tPtOztjlYOF2zpXTc8fDPMo/J9q/53nN67F+uP7dr0vqOcU/0srk3kkzPp3wLcnJnl1pMBZExEkBDfQgDwxMZEkiBiADSUiyNhUMNk1RsLFIxplkZD2WmgTiQjMmpD9g6j2b6Le1js7KqpP570uCx9T6Za/Q4/2XabENRc18Uo1x8Esv8Ac67UzLKwn4eVr6k2cZqY9Rq0/uXLcb7pdjO21a4HLdINNvVS/FH3k/miyJmsxMeEJrF6zWeJelo7Ow1ZPA2PreshCXbhKX5ke7GR262i1YtHl5fJScd5rPhIBZDI0DAWRZGDELIsgDYZFkTYEGyLYNkWwIM8fpBoetr4fFF70f5R6zM2rvUVxK8tYtSYld09prkrMc7czptl2yipRg93HDLSyVWQcXhpp9zPdltJrh2Iz3zjYovMc4mnlJvPpz4o89NI29ZNf/M2+jyCDR7umnQuqU+pVi3PtDlXmtxxLdUcpreXub3Dj8/eySvohT/UdEr9/nRptPP+m1w92UVDmnxxnkVoufAv2s4u+x046ttOO6lGPwrOEuXHPAADwZFYASRgAAAZgAARomgAQSROIAEB9Y9m/wDoF/5Lf3Pbt5gBorwkwavkzwto/C/BgA5KHO9G3/d/Pw9TrKOQwOt0f+GHn/Uf9iVgABpYiBgAAhIAAiEwAAiyLABokzzNsfD5ABC/ErcXzQ8ST/gri+IwPP25evrweq7PAzyEBRblGVbAAAn/2Q==",
        price: 100000,
        desc: "Designed By Google"
    },{
        name:"Reno 10 Pro" ,
        img: "data:image/jpeg;base64,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",
        price: 60000,
        desc:"Designed By Oppo"
    },
    {
        name:"OnePlus 11" ,
        img: "data:image/jpeg;base64,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",
        price: 55000,
        desc:"Designed By Oneplus"
    },
    {
        name:"X90 Pro" ,
        img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIVFRgRFRYYGBgYGBgaGBkYEhgYGhgZGRocHBoYGBgcIy4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHDQrJCs0NDQ0NDQ0NDQ0NDQ0NjE0NDQ0NDQ1NDQ0NDQ3NDQ0NDE0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALgBEQMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAUDBgcIAgH/xABGEAACAQIBBgcLCQkAAwAAAAAAAQIDEQQFITFRcbEGEiJBYZHwBxYjMnOBgpKhssETMzRSVHKi0eEVF0JTYpOU0vFDZML/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAgQFAQMG/8QANhEBAAIAAgUICQMFAAAAAAAAAAECAxEEEyEzkRIxMkFRUnGxBRUiU2FygcHwodHSFCPh4vH/2gAMAwEAAhEDEQA/AOzAAAAAAAAAAAAV2WMr0cNTdatLixWqLk3sis7AsQauuGmGaTi7p20yS9h9rhhh9a9dDOEuRfuzwbKDXFwtw+teuj6XCqh2khnBq792eDYQUC4UUe0v0P3vlo9pfoM4d1d+7PBfAou+Sl2l+hhxXCuhTi5zTsrX4vGk1fNojFu3SM4c5F+7PCWxg0nE90bBwm6coVlKLtJfI1HZ7Ypp7UzF+9DBfUr/AOPU/wBQi3sGi/vPwX1K/wDj1P8AUfvOwX1K/wDj1P8AUDegaM+6bgUruNZJab4ero1+KYV3V8mvQ6j12o1M34QN/Bp+Su6Lk3ETVGNVxnLxVKE4p+lKKRuAAAAAAAAAAAAAAAAAAAAAAAAAA513U5O1Jc3/AH8l1HRTnHdV00e2sjfoysaJv6+LS4PMiPi8qU6fjPPqWdvzELK2UFThZaWjTqleU5OUn1veedaZtbStM1Ps1228vzsbpHhJFvMr9tqLTBZZhLNJNda+Mn7DQlyXxWnGStdPU86efRpT6UyzwOIPXV1Zn9fpEznyv0jLyzdHo2kuNF8Ze3t0aVzpGaDNcydieLrjLNmz2a0rpWv2qzNghUUlxl5+3XvzKSR52pyWhouma72bbLfpKTBXaWvN1kupRlByhK10s9nmzq+5kSjKzT6UTsdVjKpOUXFrNZx8XxVo8/xIva1rayK9WU8c4/dBwcnm+7H2XW5ImRbI+TaEpJNK/JW+RK4rTs1Z6mSZWLvLZds+cqrKWExc69CdGsoUoPwsHe81dN5rWleN452raS7TPiJX5dxsqdO0E3UnyKaWnjSzJrrQl5xGc5QoOFGUqmIqfs/DtpL5+onmS+pfVr6c3M066th40oKlDQtL1vWX9DJccHR+Tvxqk89SeuT5r6loNexcrsrWtypybWi4UUrn1o2CpqU7P6svM+K856AybJujTb0unBva4o4Jk6PL9GW5neclfMUvJ0/dRZwuZm+kd5E/BMAB6s8AAAAAAAAAAAAAAAAAAAAADm3dW00u31jpJzburaaXb6xG/RlZ0Tf18fs4pwgrOU7dtf5dRXUanFfGVrrmej/pNy5Bqo3rtut8GVkUdrsiENJnPGvn2s8ahYYDEuLUla6d1dXXtzdZW8Wy4yd8/nXm1GSnPPd7vgSzeOUZNnwmLd73NmyXjebtq9r4nqo0bDVM109GnWi9yRWbmku3P8DlujL10bOMamXbH+f0b7TJKVrro+BEpPQSdezX0Fd9BKZkGXI8y3yLKpFSVpK69q2PmKzIXiLYt8i2sejGxY/uW8Z85QKtBwz6YvRLnT1S6enn6Of8wuAXyksVNeIuLTT5pNcqW1J8Xa5rmRZ00s8Wrp5mtd+Yg5WruEPk29Gh/Wi72bfO9N+nPznlizlXNLAryr5NWy1iONJmvV0WeNndlZUZUw+1uxGUZQYBcv0XuZ3XJXzFLycPdRwvAeP6MtzO6ZK+YpeTp+6i/g8zF9JdOvh90wAHqzgAAAAAAAAAAAAAAAAAAAAAOYd1ST+UpxvmUYNLpcql9y6jp5y3uqvwsPuU/eqkbdGVjRN/VzLLOA46utKV1s/R73qNapx4smpJqzs1oaa0p6jfeLdLWtD1FTlXJynntxZJWus10tCetdD0a7WShS+WyV/TtDtedZh/WP2axiKzk23a702VtCS0eY+aMrO+drnsZauBqR0p9TPmnhKj0RfUz1zZWrtGzkzwlmjiG7dCsbjwSwjb+UloXZdtpVZG4Ozk1KeZdPbd1m9YWkopRWZLt8DzvbPZDU0LQ7VnWXjLsj7/ALJtNkqMr3fR8CsxUpKEnBScrZlGSTedaG00vOZsmTqOMuPFxdtEpxm9GlNKwimdJvnHPzdfBcvfK8U5M7Y5+r6z2rrg/wCIti3yLuMblHwffIWxb5F5TZyGVi7y3zT5y+Vnkoak29mjttIWW4qdNrngm1styl7L7Yos4rkznzt8VbF/1lJiK7RUvf2vH/ixg0zjZ1NJryzshTJeUI8WbSvZ6Lu/t7aSFJnKxk1otyozZcn+P6MtzO28HqjlhqEm7t0oZ/RRxLJ3znoy3M7Xwa+i0PJx3FzB5mL6S6dfD7rQAHqzgAAAAAAAAAAAAAAAAAAAAAOZ91WhyqU7+NxIbLObv0+N7Dphy/urVX8pTjfMowklmzNuqr+xdRycstr1wIvOJWKTlPU5jUy3xXKKp34rt86o38zQjwgd7fIrRf5+Nuu1ia8DSb4zpxbedvPnMkMm0f5cetnlnTsbEYWme8jh/qgftdZr0Fn/APYgtefRn0PRqJFPK0I5/kY7VWjL2WuTI5Kw/PSgSKeS6C0U4DOnYavTfexwj+L4o5bv/wCP8f6E6jlO/wDB+P8AQ+aeCpLRBdZKp4amv4V1s7nTsc1em+8jhH8WejiG+b8X6FvgcK5xm8ytFvnehbSrhGK0L2kujXnFSUZNXTTz6RnTsRnC0z3kcI/isuDjvRhL69OlPZx48a3tLyErK5RcHn4KK0KMIRVuZRukupIt5y5L2HLTlEyozFuVMW585z8c9qXVnanBa1xuvP8AEoMpqzUuaW/nLfHS0R1JLqK7Hx41NvnjZ9vNcz5nbC/gbGm5cjaP3Z28043/APj2lO5F5wiXIk9ag/OpJX6pPrNdUj3quV64/PzPNNyc+X6MtzO4ZBp8XDUY3valDPa38Keg4bk58v0XuZ3Dg5NywtCTd26UM/ootYXMyfSXTr4fdZgA9WcAAAAAAAAAAAAAAAAAAAAABzDusQtKnPnaivVcmveZ085l3WtNLtzsjfoys6Hv6/nU0KDM8CNFmeDPB9FCTBmaJHgzNAOpETNFkaDM8GHGeLM8HmexkaLM0Xmex7hmjK44PPwa2LfIt5aGim4PPwa2LfIt5yzDE6E+H2Y197b5p837jJcpmCKvCa/oZ9Yx8p7TAp2jP7r7ewz7bJhcpzNV4Qrwd/6Z+zis1WEjaOEVTkNaoVPa4L4mo05Zizg7aZ/GVmZytP52rLJr5fovczu2Q6SjhqMVntShp+6jguTJcv0XuZ37JHzFHyVP3UXMLmZXpHp18PumgA9GeAAAAAAAAAAAAAAAAAAAAABzLut6aXbnZ005j3W9NLtzsjfoys6Hv6/nVLQEzLFmFMywZXfRQkwZmiyPBmaDDqRBmaLI8GZYs6JCZli8z2EeLMkXmewIyuuDz8Gti3yLao+S9hT8Hn4NfdW+RcczXQL7YY197b5p85fuNWe+tJlXip2Vtfb8y1nyoRepW86zPcUeMln2GddewdrWeElXkT2Qitsqik11QZrNORb8J6vJjH603LzQjxV77KSLLuFXLDhO8+3KzyXLl+i9zPQWSPo9HyVP3EeeMly5fovcz0Pkf6PR8lT9xFrD5mXp0+3HgmgAmogAAAAAAAAAAAAAAAAAAAAAcw7rmml252dPOYd1zTS2fFkbdGVjRN/X6+UufRZmgyPEyxZXfRQkRZngyNBmaDCSRBmWLI8WZ4MDNFmaLzPYR4syQlmew65K54Py8H6Md8i6hI1/IMvB+jHfIt4zJSxMXeW+a3nKQp2i4dLts7byoxNPSWMVe+t510tc3nW5FZlzEqlQnK13KLUVtzZ+jPv1FK2FM3yWcHEyhzjLmJU6zS0RSgva5fik15iLFkdt3bedt53resyJl3LJPPasMly8Itj3M9GZG+j0fJU/cR5vyXLwi2S3M9IZG+j0fJU/cR6U5mfpk+1HgmgAmpgAAAAAAAAAAAAAAAAAAAAAcv7rumls+LOoHL+69ppbPiyNujKxom/r9fKXPIsyxZhiZIs8H0UM8DPHWR6cyRCs/b7LWscSZYLUjLFnzTxDWbPbNolZ5r8/nPqdRybk+jn1LXzvMBkizJF5nsMEWZIPM9jBK3yG/B+jHfItEyryBG9NfdW+Ra8TndktbzL9fMSlh4m8t81vOWSm8/x1dJr3CuUppt6LZlqS0Lbp87Zb1MQvFjo53zv8kUuUql3KlL+JOUHrt40fiSrCejWjWbXOa6tJn5GRlx8LTZGTOrFudY5Ll4RbJbmelMjfR6PkqfuI80ZJfhFsluZ6WyL9Ho+Sp+4idWdpc+1CcACSqAAAAAAAAAAAAAAAAAAAAABy7uv6aWz4s6icu7r+mls+LI26MrGib+v18pc6izJFmJM+4ng+hhITMkTCmZIs4kzxZlizAmZosOsyZki8z2MjpmRPM9gFjkrEzjBKLsuLF6Frlzkx1W3dtt9LuVOBlmX3I75E2Mz0fP4u8t81vOUtTIOWMI6kORmqQfGpv+pc3n0eczqZ9qYRjZOcOb5QqqfLtZ6JR+rJaUQLm0cLMktN4qmsz+civf8Az69ZqvGJLWt5e3rT8kPwq2S3M9NZF+j0fJU/cR5iyQ/CrZLcz07kX6PQ8lT9xEqqmk88JwAJKwAAAAAAAAAAAAAAAAAAAAAHM+6/h38nTrW5CupO2ZbdWl9TOmGOpTjJOMkmnpTSae1M5MZp4d5paLR1PNcE7J2fUzJFdD9p3+XB7BvO8PS/txPzvewX2el/biQ1fxX/AFlbuxxcFj5+pmWL7WZ3XvdwX2el/bR+97uC+z0v7aGr+LvrO3dji4ZGSMsX2sdu73sH9np+oj9738H9np+ohq/i760t3I4uJqXawqYiMYuUnZaND0vQjtne/g/s9P1EfPe5g/5MPb+Y1fxPWl+7HFw/9s4ek/k5zSlGMVJcWTs7XaulzOVvMZI8JsH/ADPwT/I7V3sYH7PT9Ud7GB+z0/VJcmGfOLaZzlxdcJ8H/N/BP8j6XCjB/wA38E/9Ts3ezgfs9P1R3tYH7PT9UciHNZLjT4UYN5nUT9Cf+ppuV3hoz41CalCX8PFknB6ldZ0emO9rBfZ6fqjvawX2en6o5Lusl5pyI3OtGEE5Sd0lFNttq3xPUeTaLhRp03pjThF7YxSe4xYTJOGpPjU6UIvWoq/WTzsRkja82nOQAHUQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/2Q==",
        price: 70000,
        desc:"Designed By Vivo"
    } 
]


async function seedDB(){
    await Product.insertMany(products);
    console.log("Data seeded");
}

module.exports = seedDB;