/* eslint-disable no-console */
export default function ({ $axios }) {
  const MemberStack = window.MemberStack;
  MemberStack.onReady.then(function(member) {   
   window.member = member;
  })
  $axios.onRequest(config => {
    config.headers['x-ms-token']=MemberStack.getToken();
    console.log(config.headers)
   //  config.headers['x-ms-token']='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImQ3NjM1OGNmYjc4NzdhZTdjYWE4ZDdjNTY3YjYwZjdhY2YzZmQ0MjQifQ.eyJpZCI6IjYwZjdmMWRhMDM0ODFjMDAwNGNkYTlhMSIsImVtYWlsIjoia2FybnVybWF4QG1haWwucnUiLCJzaXRlIjoiNjBmN2I2YTU5MGU3NDIwMDA0ZjAzODYyIiwiaWF0IjoxNjI3MjkyODcwLCJleHAiOjE2Mjc4OTc2NzB9.OvMO-NU_kDBD1Wc_hsXtaLQC_lPK24TsE-nyr-8G2kduCkwYbZgS_IcNdtgVcZzWIi9OoRSBpoV334qLMWVpx4KDElKeZn7GxVdJaVoGM3MMFArb6jNOX4c8vn2GzcRFKvpibWDAN_b6ganw8hxodoqDmy-FzckYO-_X5DAhmDkOwqTJXDNaKcqLxbyo1lzF0azU5fdMNnGjjZ9T8oW1yXTHsixM6TjJ09xA0PiVXMi397jRhLD5j4C_9zLJYBKf7Xt9VYI5kv8pZhzGZ5DRwLt0jcj-ZqZSAL4WybufSxVZg-KWj_HupG5V4MXcMHyJZktMyX-TOT9B5j5hWK0bX6tjy6UK3ggHPrRcTKXr-5z0e9HI6i94AmO9-W9jCcZbKuDl8_U1z7DGERWGSSuKSDt6mzJTShPAj-80TwOIn6S2tJiNDphBI1sWeP7pBzbxyFv6PlDxcvo3t7eEvFIfdJkAtNzpUnd6EpXeJkcQZZgH3-7x7-ubkkUspQWBbema01KL5V_jtrmQ8OEYaVyhrE8sHdDNd5o2W3YsfOmRgxSmwORVPrMYW7CK76GEg_0Aj042Cf83L-NJVnDonBDGOqPofCG6ifGtIG9Vq_N_wva6kkf-G0LrmMceTRPEy4bLmCK_u3pnZHT23y0I73wFm4T3jkLgyiPkTiW5vGSMQZ4'
  })
 }