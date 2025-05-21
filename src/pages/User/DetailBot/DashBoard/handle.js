import {useEffect, useState} from "react";
import {Typography, DatePicker} from "antd";
import {getGeneralStats, getLastestMessageStats, getMessageStatsByDay} from "../../../../api/user/bot";
import {useSelector} from "react-redux";
import moment from "moment/moment";
import {useNavigate} from "react-router-dom";

export default function Handle() {
  const navigate = useNavigate();
  const bot = useSelector((state) => state.detailBot.bot);
  const {Title, Text} = Typography;
  const {RangePicker} = DatePicker;
  const [dateFilter, setDateFilter] = useState({
    start_day: moment().startOf("month").format("DD-MM-YYYY"),
    end_day: moment().endOf("month").format("DD-MM-YYYY"),
  });
  const [selectedDateOption, setSelectedDateOption] = useState("Tháng này");
  const [isCustomDateSelected, setIsCustomDateSelected] = useState(false);
  const [customDateRange, setCustomDateRange] = useState([null, null]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generalStats, setGeneralStats] = useState({});
  const [latestMessageStats, setLatestMessageStats] = useState({});
  const [messageStatsByDay, setMessageStatsByDay] = useState({});

  const updateDateFilter = (option) => {
    let start_day, end_day;

    if (option === "Tùy chọn" && customDateRange[0] && customDateRange[1]) {
      // Custom date range selected
      start_day = customDateRange[0].format("DD-MM-YYYY");
      end_day = customDateRange[1].format("DD-MM-YYYY");
    } else {
      // Predefined options
      switch (option) {
        case "Hôm nay":
          start_day = moment().format("DD-MM-YYYY");
          end_day = moment().format("DD-MM-YYYY");
          break;
        case "Hôm qua":
          start_day = moment().subtract(1, "days").format("DD-MM-YYYY");
          end_day = moment().subtract(1, "days").format("DD-MM-YYYY");
          break;
        case "Tuần này":
          start_day = moment().startOf("week").format("DD-MM-YYYY");
          end_day = moment().endOf("week").format("DD-MM-YYYY");
          break;
        case "Tuần trước":
          start_day = moment().subtract(1, "weeks").startOf("week").format("DD-MM-YYYY");
          end_day = moment().subtract(1, "weeks").endOf("week").format("DD-MM-YYYY");
          break;
        case "Tháng này":
          start_day = moment().startOf("month").format("DD-MM-YYYY");
          end_day = moment().endOf("month").format("DD-MM-YYYY");
          break;
        case "Tháng trước":
          start_day = moment().subtract(1, "months").startOf("month").format("DD-MM-YYYY");
          end_day = moment().subtract(1, "months").endOf("month").format("DD-MM-YYYY");
          break;
        default:
          start_day = moment().startOf("month").format("DD-MM-YYYY");
          end_day = moment().endOf("month").format("DD-MM-YYYY");
      }
    }

    setDateFilter({
      start_day,
      end_day,
    });
  };

  useEffect(() => {
    const handleGetDashboardStats = async () => {
      setLoading(true);
      const res = await getGeneralStats(bot._id, dateFilter);
      setGeneralStats(res.data.data);
      setLoading(false);
    };
    handleGetDashboardStats();
  }, [dateFilter]);

  useEffect(() => {
    const handleGetLatestMessageStats = async () => {
      const res = await getLastestMessageStats(bot._id);
      setLatestMessageStats(res.data.data);
    };
    handleGetLatestMessageStats();
  }, []);

  useEffect(() => {
    const handleGetMessageStatsByDay = async () => {
      const res = await getMessageStatsByDay(bot._id);
      const chartData = res.data.data.map((item) => {
        return {
          date: moment(item.day).format("MMM-DD"),
          value: item.number_message,
        };
      });
      setChartData(chartData);
    };
    handleGetMessageStatsByDay();
  }, []);

  useEffect(() => {
    const config = {
      data: chartData,
      xField: "date",
      yField: "value",
      point: {
        shapeField: "circle",
        sizeField: 2,
      },
      smooth: true,
    };

    setMessageStatsByDay(config);
  }, [chartData]);

  const handleNavigateToConversation = (id) => {
    if (id) {
      navigate(`/bot-chats/${bot._id}/conversation/${id}`);
    } else {
      navigate(`/bot-chats/${bot._id}/conversation`);
    }
  };

  return {
    chartData,
    Title,
    Text,
    RangePicker,
    dateFilter,
    selectedDateOption,
    isCustomDateSelected,
    customDateRange,
    generalStats,
    loading,
    latestMessageStats,
    messageStatsByDay,
    setDateFilter,
    setSelectedDateOption,
    setIsCustomDateSelected,
    setCustomDateRange,
    updateDateFilter,
    handleNavigateToConversation,
  };
}
