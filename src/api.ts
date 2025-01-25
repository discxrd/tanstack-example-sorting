import { useMemo, useState } from "react";
import { User } from "./api.dto";
import { generateRandomTurnover, usernames } from "./mock";

interface UseRequestParams {
  page: number;
  pageSize: number;
  sortBy?: string; // Поле для сортировки (например, "username" или "totalTurnover")
  sortOrder?: "asc" | "desc"; // Направление сортировки
}

const generateHexId = (): string => {
  return Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
};

export const useRequest = ({
  page,
  pageSize,
  sortBy,
  sortOrder,
}: UseRequestParams) => {
  const mock: User[] = [];

  // Генерация моковых данных
  for (let i = 0; i < 50; i++) {
    const id = useMemo(() => generateHexId(), []);
    const username = usernames[i % usernames.length]; // Циклическое использование имен
    const totalTurnover = useMemo(() => generateRandomTurnover(), []);
    mock.push({ id, username, totalTurnover });
  }

  const [data, setData] = useState(mock);

  // Сортировка данных
  const sortedData = [...mock].sort((a, b) => {
    if (!sortBy || !sortOrder) return 0; // Если сортировка не указана, возвращаем исходный порядок

    if (sortBy === "username") {
      // Сортировка по username
      if (sortOrder === "asc") {
        return a.username.localeCompare(b.username); // По возрастанию
      } else {
        return b.username.localeCompare(a.username); // По убыванию
      }
    } else if (sortBy === "totalTurnover") {
      // Сортировка по totalTurnover
      if (sortOrder === "asc") {
        return a.totalTurnover - b.totalTurnover; // По возрастанию
      } else {
        return b.totalTurnover - a.totalTurnover; // По убыванию
      }
    }

    return 0; // Если поле сортировки неизвестно, возвращаем исходный порядок
  });

  // Общее количество данных
  const total = sortedData.length;

  // Пагинация данных
  const paginatedData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Функция для повторного запроса данных
  const refetch = () => {
    console.log("Refetching data...");
    // Здесь можно добавить логику для повторного запроса данных
  };

  return { data: paginatedData, total, refetch };
};
