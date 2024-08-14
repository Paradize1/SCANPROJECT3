let accountInfoData = null; // Инициализация переменной для хранения данных об аккаунте

export async function getAccountInfo(accessToken) {
  try {
    const accountInfoResponse = await fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!accountInfoResponse.ok) {
      throw new Error('Ошибка при получении информации об аккаунте');
    }

    accountInfoData = await accountInfoResponse.json(); // Сохраняем данные об аккаунте в переменную

    return accountInfoData;
  } catch (error) {
    console.error('Ошибка при получении информации об аккаунте:', error.message);
    throw error;
  }
}

export function getStoredAccountInfo() {
  return accountInfoData; // Функция для получения сохранённых данных об аккаунте
}