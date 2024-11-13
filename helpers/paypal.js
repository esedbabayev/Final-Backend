import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id:
    "AV_bD8W3h3tfBwFMZsd96JwrIVBpOCZEgFBV68OJXNmsqDQCisuTBDPeZtc8qB3T9HaY1Kfj8zQUfN0_",
  client_secret:
    "EDfE09euc81tMaM4g_uwn4S9UbLZqel5kXnv4Ck1RR1pPIaJVtpIZ2uR9-u0jf4OpTAxfxTWSqlS3oll",
});

export default paypal;
